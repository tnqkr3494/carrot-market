import type { NextPage } from "next";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface AnswerWithUser extends Answer {
  user: User;
}
interface PostWithUser extends Post {
  user: User;
  Answer: AnswerWithUser[];
  _count: {
    Answer: number;
    Wondering: number;
  };
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null,
  );
  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`,
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);
  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            Wondering: data.isWondering
              ? data.post._count.Wondering - 1
              : data.post._count.Wondering + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false,
    );

    if (!loading) {
      wonder({});
    }
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate(); //답변 올리자마자(answerData가 변경되면) 바로 화면에 반영되게 하는 코드
    }
  }, [answerData, reset]);

  const onValid = (data: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(data);
  };

  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user?.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>{" "}
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
            <button
              onClick={onWonderClick}
              className="flex items-center space-x-2 text-sm"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count.Wondering}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count.Answer}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post?.Answer.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500 ">2시간 전</span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            register={register("answer", { required: true, minLength: 1 })}
            name="description"
            placeholder="Answer this question!"
            required
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
            Reply
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;

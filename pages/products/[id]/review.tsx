import type { NextPage } from "next";

import { useForm } from "react-hook-form";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import Layout from "@/components/layout";
import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ReviewForm {
  score: string;
  review: string;
}

interface UploadReviewResponse {
  ok: boolean;
}

const Review: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ReviewForm>();
  const [uploadReview, { loading, data }] = useMutation<UploadReviewResponse>(
    `/api/products/${router.query.id}/review`,
  );

  const onValid = ({ score, review }: ReviewForm) => {
    if (loading) return;
    uploadReview({ score, review });
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="리뷰">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <span>score </span>
        <input required {...register("score", { required: true })} />
        <TextArea
          register={register("review", { required: true })}
          name="review"
          label="Review"
          required
        />
        <Button text="Upload a review" />
      </form>
    </Layout>
  );
};

export default Review;
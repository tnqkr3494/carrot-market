import Layout from "@/components/layout";
import { cls } from "@/libs/client/utils";
import { Review, User } from "@prisma/client";
import { NextPage } from "next";
import useSWR from "swr";

interface ReviewsWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewsWithUser[];
}

const Reviews: NextPage = () => {
  const { data } = useSWR<ReviewsResponse>("/api/reviews");
  return (
    <Layout title="Reviews" canGoBack>
      {data?.reviews.map((review) => (
        <div key={review.id} className="border-b-2 p-5">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-slate-500" />
            <div>
              <h4 className="text-sm font-bold text-gray-800">
                {review.createdBy.name}
              </h4>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg
                    key={index}
                    className={cls(
                      "h-5 w-5",
                      review.score >= star
                        ? "text-yellow-400"
                        : "text-gray-400",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>{review.review}</p>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Reviews;

import type { NextPage } from "next";
import Button from "../../../components/button";
import Layout from "../../../components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChatRoom, Product, Purchase, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { useEffect, useState } from "react";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import Modal from "@/components/modal-portal";

interface ProductWithUser extends Product {
  user: User;
  Purchase: Purchase[];
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLinked: boolean;
  findChatRoom: ChatRoom;
}

interface BuyForm {
  price: string;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<BuyForm>();
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null,
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const [makeChatRoom, { loading, data: check }] = useMutation<{ ok: boolean }>(
    `/api/products/${router.query.id}/chat?name=${data?.product.user.id}`,
  );

  const [buyProduct, { loading: buyLoading, data: buyIt }] = useMutation<{
    ok: boolean;
  }>(`/api/products/${router.query.id}/buy`);
  const [isInvalidPriceModalOpen, setIsInvalidPriceModalOpen] = useState(false);
  const [isBuyConfirmationModalOpen, setIsBuyConfirmationModalOpen] =
    useState(false);

  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isLinked: !data.isLinked }, false);
    toggleFav({});
  };

  const onTalkClick = () => {
    if (loading) return;
    makeChatRoom({});
  };

  const onValid = ({ price }: BuyForm) => {
    if (buyLoading) return;
    if (Number(price) !== data?.product.price) {
      setIsInvalidPriceModalOpen(true);
      return;
    }
    setIsBuyConfirmationModalOpen(true);
  };

  //채팅방 동작
  useEffect(() => {
    if (check?.ok) {
      router.push("/chats");
    }
  }, [check]);

  // 구매 동작
  useEffect(() => {
    if (buyIt?.ok) {
      router.push("/profile/bought");
    }
  }, [buyIt]);

  return (
    <Layout canGoBack>
      {data ? (
        <div className="px-4  py-4">
          <div className="mb-8">
            <div className="h-96 bg-slate-300" />
            <div className="flex cursor-pointer items-center space-x-3 border-b border-t py-3">
              <div className="h-12 w-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.product?.user?.name}
                </p>
                <Link
                  legacyBehavior
                  href={`/users/profiles/${data?.product?.user?.id}`}
                >
                  <a className="text-xs font-medium text-gray-500">
                    View profile &rarr;
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.product?.name}
              </h1>
              <span className="mt-3 block text-2xl text-gray-900">
                {data?.product?.price}
              </span>
              <p className=" my-6 text-gray-700">
                {data?.product?.description}
              </p>
              {data?.product.Purchase.length === 0 ? (
                <div className="mb-5">
                  <div className="mb-5 flex items-center justify-between space-x-2">
                    {!data?.findChatRoom ? (
                      <>
                        <Button
                          large
                          text={loading ? "Loading" : "Talk to seller"}
                          onClick={onTalkClick}
                        />
                      </>
                    ) : (
                      <Link
                        className="w-full"
                        href={`/chats/${data?.findChatRoom.id}`}
                      >
                        <Button large text="Go To Chatting Room" />
                      </Link>
                    )}

                    <button
                      onClick={onFavClick}
                      className={cls(
                        "flex items-center justify-center rounded-md p-3",
                        data?.isLinked
                          ? " text-red-500 hover:bg-gray-100 hover:text-red-500"
                          : "text-gray-400 hover:bg-gray-100 hover:text-gray-500",
                      )}
                    >
                      <svg
                        className="h-6 w-6 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit(onValid)}
                    className="flex items-center justify-end space-x-2"
                  >
                    <Input
                      register={register("price", { required: true })}
                      name="buy"
                      required
                      type="string"
                      kind="price"
                    />
                    <Button large text="buy" buy={true} />
                  </form>
                </div>
              ) : (
                <p className="rounded-md bg-red-500 p-5 text-center ">
                  <span className="mr-3 text-xl font-bold italic">
                    Sold Out
                  </span>
                  <span className="text-3xl">😭</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
            <div className=" mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts?.map((product) => (
                <Link
                  key={product.id}
                  legacyBehavior
                  href={`/products/${product.id}`}
                >
                  <a>
                    <div className="mb-4 h-56 w-full bg-slate-300" />
                    <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      {product.price}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center text-2xl font-bold text-orange-500">
          Loading...
        </div>
      )}
      {isInvalidPriceModalOpen && (
        <Modal
          open={isInvalidPriceModalOpen}
          onClose={() => setIsInvalidPriceModalOpen(false)}
        >
          <div>올바른 가격을 입력해주세요!</div>
        </Modal>
      )}

      {isBuyConfirmationModalOpen && (
        <Modal
          open={isBuyConfirmationModalOpen}
          onClose={() => setIsBuyConfirmationModalOpen(false)}
          onGo={() => buyProduct({})}
        >
          <div>구매하시겠습니까?</div>
        </Modal>
      )}
    </Layout>
  );
};

export default ItemDetail;

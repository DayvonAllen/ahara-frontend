import Layout from "@/components/Layout";
import { CameraIcon } from "@heroicons/react/solid";
import { API_URL } from "../config/index";
import Image from "next/image";
import Link from "next/link";

export default function About({ categories }) {
  return (
    <Layout
      title="About Ahara"
      description="Short bio about me"
      keywords="bio, life, interests, hobbies"
      categories={categories}
    >
      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div className="border-gray-600 ">
              <h1 className="text-2xl text-gray-700 font-light tracking-wide uppercase">
                アバウト{" "}
              </h1>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <Image
                      className="rounded-lg shadow-lg object-cover object-center"
                      src="https://res.cloudinary.com/df1dxokhm/image/upload/v1628028884/ahara_pink_00ce14ccb6.png"
                      alt="ahara logo"
                      width={1184}
                      height={1376}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  アハラキッチンはアメリカの暮らし、レストランで働く仕事事情、国際結婚、ビザの事などを書いています。
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  2012年にカリフォルニアロサンゼルスに移住し、現在はテキサスで寿司シェフをしています。
                </p>
                <a
                  href="https://youtube.com/channel/UCpsip3Vu-xLIm-eqUUjB59A"
                  target="_blank"
                >
                  You Tubeではアメリカのお寿司などを紹介しています。
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const cat = await fetch(`${API_URL}/categories`);
  const categories = await cat.json();

  return {
    props: {
      categories,
    },
  };
}

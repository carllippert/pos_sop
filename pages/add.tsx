import { useRouter } from "next/router";
import { useState } from "react";
import Container from "@/components/container";
import Layout from "@/components/layout";
import slugify from "slugify";
import { Input } from "@/components/basic/input";
import { Label } from "@/components/basic/label";
import { Button } from "@/components/basic/button";
import { TextArea } from "@/components/basic/textarea";

import { useForm } from "react-hook-form";
import UploadFile from "@/components/basic/upload-file";

import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";

interface AgentFields {
  name: string;
  price: string;
  description: string;
}

const Create = () => {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIslLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentFields>();

  const [image, setImage] = useState<File>();
  // const [pdf, setPdf] = useState<File>();

  // const { mutate: createProduct, isLoading } = useCreateProduct({
  //   onSuccess(receipt) {
  //     reset();

  //     if (!receipt) return;
  //     const slug = receipt.events?.find((e) => e.event === "ProductCreated")
  //       ?.args?._slug;

  //     router.push(`/${slug}`);
  //   },
  // });

  const onSubmit = handleSubmit((data) => {
    if (!image) return;
    const { name, description, price } = data;

    //TODO: supabase create
    // createProduct({
    //   name: data.name,
    //   slug: slugify(name).toLowerCase(),
    //   description,
    //   price: ethers.utils.parseEther(price),
    //   image,
    //   pdf,
    // });
  });

  return (
    <Layout>
      <Container className="mt-32 pb-10">
        <h1 className="text-4xl font-bold mb-4">List New Agent</h1>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Input
            label="Name"
            block
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            label="Price"
            type="number"
            step="0.0000001"
            block
            {...register("price", { required: "Price is required" })}
            error={errors.price?.message}
          />
          <TextArea
            label="Description"
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
          />
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <Label>Image</Label>
              <UploadFile
                file={image}
                setFile={setImage}
                fileTypes="PDF, SVG, PNG, JPG or GIF"
                accept="image/*"
              />
            </div>
            {/* <div className="flex-1">
              <Label>Content</Label>
              <UploadFile
                file={pdf}
                setFile={setPdf}
                accept="application/pdf"
              />
            </div> */}
          </div>

          <Button
            className="mt-2 tracking-wider"
            size="lg"
            block
            type="submit"
            loading={isLoading}
            disabled={!image || isLoading || !user}
          >
            {user ? "Publish" : "Login to list agent"}
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default Create;

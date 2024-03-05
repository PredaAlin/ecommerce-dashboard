
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const bucketName = "next-ecommerce-alin";
export async function POST(req) {
  const { method } = req;

  //console.log(req)
  if (method === "POST") {
    const formData = await req.formData();
    console.log(formData);

    const files = formData.getAll("file");

    console.log(files[0].size);
    const client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    const links = []
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const contentType = file.type.split("/").pop();
      const newFileName = Date.now() + '.' + ext
      const fileData = await file.arrayBuffer();

      console.log({ ext,newFileName , file });
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          Body: fileData,
          ACL: 'public-read',
          ContentType: contentType
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
      links.push(link)
    }

    return NextResponse.json(links)
  }
}

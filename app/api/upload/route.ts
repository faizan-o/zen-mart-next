import { uploadImage } from "@/server-actions/upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const typeFoler = formData.get("folder") as string;

    const folder = `ZenMartImages/${typeFoler}`;

    const data: any = await uploadImage(image, folder);

    const imageUrl = data?.secure_url;
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    return NextResponse.json({ url: null });
  }
}

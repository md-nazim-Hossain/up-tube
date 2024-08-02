import { IAPIResponse, IUser } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const accessTokenExpires = new Date(
      new Date().setDate(new Date().getDay() + 3),
    );
    const refreshTokenExpires = new Date(
      new Date().setDate(new Date().getDay() + 365),
    );
    const body = await req.json();
    const response = (await axios
      .post(apiRoutes.users.login, body)
      .then((res) => res.data)) as IAPIResponse<{
      user: IUser;
      accessToken: string;
      refreshToken: string;
    }>;

    const data = response.data;
    if (!data) return NextResponse.json(response, { status: 400 });
    cookies().set("accessToken", data.accessToken, {
      expires: accessTokenExpires,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    cookies().set("refreshToken", data.refreshToken, {
      expires: refreshTokenExpires,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return NextResponse.json(
      {
        data: response?.data?.user,
        message: response?.message,
        success: response.success,
      },
      { status: 200 },
    );
  } catch (error: IAPIResponse<any> | any) {
    return NextResponse.json(error, {
      status: error.status,
      statusText: error?.statusText,
    });
  }
};

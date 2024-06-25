import Image from "next/image";
import Link from "next/link";
import React from "react";

type AppLogoProps = {
  size?: "small" | "medium" | "large";
};

const sizeMap = {
  small: 50,
  medium: 100,
  large: 150,
};

const AppLogo = ({ size = "medium" }: AppLogoProps) => {
  const imageSize = sizeMap[size];

  return (
    <Link href={"/"}>
      <Image
        src={"/logo.svg"}
        alt={"Logo"}
        width={imageSize}
        height={imageSize}
      />
    </Link>
  );
};

export default AppLogo;

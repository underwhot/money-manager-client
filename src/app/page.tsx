import Title from "@/components/title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const imagesList = [
  {
    title: "Step: 1",
    description: "Register to get started",
    image: "/01.jpg",
  },
  {
    title: "Step: 2",
    description: "Now login to your account",
    image: "/02.jpg",
  },
  {
    title: "Step: 3",
    description: "Create a new transaction",
    image: "/03.jpg",
  },
  {
    title: "Step: 4",
    description: "Manage categories",
    image: "/04.jpg",
  },
];

export default function Home() {
  return (
    <>
      <Title>What is the next big thing?</Title>

      <div className="flex flex-wrap gap-5 [&>div]:flex-[0_1_calc(50%-0.625rem)]">
        {imagesList.map((image) => (
          <Card key={image.title}>
            <CardHeader>
              <CardTitle>{image.title}</CardTitle>
              <CardDescription>{image.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Image
                src={image.image}
                alt="register"
                width={625}
                height={391}
                layout="responsive"
                priority
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function AboutPage() {
  const messages = [
    {
      id: 1,
      content:
        "Hi, I'm Phong, a front-end developer with over a year of experience building user-friendly web interfaces using React.js, Next.js, and TypeScript. I’m passionate about clean code, performance, and creating seamless user experiences. Currently, I’m expanding my skills toward full-stack development, with the goal of becoming a well-rounded developer who can handle both front-end and back-end challenges. How can i help you?",
      sender: "other",
    },
    {
      id: 2,
      content: "Hi, can you introduce about this project?",
      sender: "me",
    },
    {
      id: 3,
      content:
        "This project is a preview of a code challenge from 99tech. In this web app, I used React.js and TypeScript to present my approaches to solving the three main problems in the challenge.",
      sender: "other",
    },
    {
      id: 4,
      content:
        "If you enjoyed the project or found the solutions valuable, I’d love to hear from you! You can contact me via email: nchp9120@gmail.com ^^. Thanks for visiting!",
      sender: "other",
    },
    {
      id: 5,
      content: "I got it, thank you for your information.",
      sender: "me",
    },
  ];
  return (
    <div className="w-full">
      <div className="p-4 flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage
              src="/public/about/avatar.jpg"
              className="rounded-full h-12 w-12 object-cover"
            />
            <AvatarFallback>My Avatar</AvatarFallback>
          </Avatar>
          <p className="text-black font-semibold text-lg">
            Hoang Phong - Front End Developer
          </p>
        </div>
      </div>

      <div className="h-[1px] bg-black w-full"></div>

      <div className="bg-white dark:bg-black p-4 flex">
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full",
                  message.sender === "me" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "w-max max-w-[50%] rounded-lg px-4 py-2 text-sm",
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

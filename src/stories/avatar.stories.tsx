// [build] library: 'shadcn'
import { Avatar, AvatarFallback, AvatarImage } from "../components/dashboard/ui/avatar";

const meta = {
  title: "ui/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Base = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  args: {},
};

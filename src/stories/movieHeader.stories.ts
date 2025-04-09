import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/headerMovie";
import SampleMovie from "./sampleData";

const meta: Meta<typeof MovieHeader> = {
    title: "Movie Details Page/MovieHeader",
    component: MovieHeader,
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";

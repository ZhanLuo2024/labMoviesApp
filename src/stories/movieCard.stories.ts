import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard/index";
import SampleMovie from "./sampleData";

const meta: Meta<typeof MovieCard> = {
    title: 'Home Page/MovieCard',
    component: MovieCard,
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
export const Exceptional: Story = {
    args: sampleNoPoster

};
Exceptional.storyName = "Exception";

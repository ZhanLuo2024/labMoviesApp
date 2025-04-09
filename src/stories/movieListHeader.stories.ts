import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList/index";

const meta: Meta<typeof MovieListHeader> = {
    title: 'Home Page/Header',
    component: MovieListHeader,
  };
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover Movies'}
};

Basic.storyName = "Default";

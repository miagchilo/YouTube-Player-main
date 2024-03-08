import WelcomeCard from './WelcomeCard';

export default {
    title: 'Components/WelcomeCard',
    component: WelcomeCard,
};

const Template = (args) => <WelcomeCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    width: 300,
    height: 300,
    title: 'Welcome to the Storybook',
    textColor: 'white',
    backgroundColor: 'black',
};

export const Secondary = Template.bind({});
Secondary.args = {
    width: 500,
    height: 100,
    title: 'Hello World',
    textColor: 'yellow',
    backgroundColor: 'red',
};

export const Small = Template.bind({});
Small.args = {
    width: 50,
    height: 50,
    title: 'Hi',
    textColor: 'white',
    backgroundColor: 'gray',
};
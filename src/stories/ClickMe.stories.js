import ClickMe from './ClickMe';

export default {
    title: 'Components/ClickMe',
    component: ClickMe,
};

const Template = (args) => <ClickMe {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    width: 100,
    height: 40,
    title: 'Click Me',
    backgroundColor: 'gray',
    textColor: 'white',
    borderRadius: 10,
};

export const Secondary = Template.bind({});
Secondary.args = {
    width: 200,
    height: 50,
    title: 'Welcome to the Himalayas',
    backgroundColor: 'purple',
    textColor: 'yellow',
    borderRadius: 20,
};

export const Circle = Template.bind({});
Circle.args = {
    width: 100,
    height: 100,
    title: 'Hello',
    backgroundColor: 'brown',
    textColor: 'white',
    borderRadius: 100,
};

import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { Button } from './Button'

type T = typeof Button
type Story = ComponentStoryObj<T>

export default {
  component: Button,
  args: { children: 'Upload' },
} as ComponentMeta<T>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

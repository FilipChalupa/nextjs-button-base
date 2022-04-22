import React, { FunctionComponent } from 'react'
import { ButtonBase, DistinctBaseButtonProps, SharedBaseButtonProps } from '..'

type ExampleButtonProps = {
	variant?: 'primary' | 'secondary'
	size?: 'small' | 'medium'
} & Omit<SharedBaseButtonProps, 'className'> &
	DistinctBaseButtonProps

export const ExampleButton: FunctionComponent<ExampleButtonProps> = ({
	variant = 'primary',
	size = 'medium',
	...props
}) => {
	const className = `button button--variant-${variant} button--size-${size}`

	return <ButtonBase className={className} {...props} />
}

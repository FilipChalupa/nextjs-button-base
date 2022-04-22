import Link, { LinkProps as NextLinkProps } from 'next/link'
import React, {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	FunctionComponent,
	HTMLAttributes,
} from 'react'
import { assertNever } from './utils/assertNever'

type ButtonLinkProps = {
	type: 'link'
} & NextLinkProps

type ButtonButtonProps = {
	type: 'button'
	onClick?: React.MouseEventHandler<HTMLButtonElement>
} & Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onClick' | 'disabled'
>

type ButtonSubmitProps = Omit<ButtonButtonProps, 'type'> & {
	type: 'submit'
}

type ButtonResetProps = Omit<ButtonButtonProps, 'type'> & {
	type: 'reset'
}

type SharedProps = {
	className?: string
	children?: React.ReactNode
} & Pick<HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'id'>

export type ButtonBaseProps = SharedProps &
	(ButtonLinkProps | ButtonButtonProps | ButtonSubmitProps | ButtonResetProps)

export const ButtonBase: FunctionComponent<ButtonBaseProps> = ({
	children,
	className,
	id,
	...otherProps
}) => {
	const commonProps = { className, id }

	if (
		otherProps.type === 'button' ||
		otherProps.type === 'submit' ||
		otherProps.type === 'reset'
	) {
		return (
			<button
				{...commonProps}
				type={otherProps.type}
				onClick={otherProps.onClick}
				disabled={otherProps.disabled}
			>
				{children}
			</button>
		)
	} else if (otherProps.type === 'link') {
		return (
			<Link
				href={otherProps.href}
				as={otherProps.as}
				replace={otherProps.replace}
				scroll={otherProps.scroll}
				shallow={otherProps.shallow}
				passHref={otherProps.passHref}
				prefetch={otherProps.prefetch}
				locale={otherProps.locale}
			>
				<a {...commonProps}>{children}</a>
			</Link>
		)
	} else {
		assertNever(otherProps)
	}
	return null
}

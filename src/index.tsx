import Link, { LinkProps as NextLinkProps } from 'next/link'
import React, {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	FunctionComponent,
	HTMLAttributes,
} from 'react'
import { assertNever } from './utils/assertNever'

// @TODO: find more general approach for common props like onClick onMouseDown …

type ButtonLinkProps = {
	type: 'link'
} & Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
	'onClick'
> &
	NextLinkProps

type ButtonButtonProps = {
	type: 'button'
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

export type DistinctBaseButtonProps =
	| ButtonLinkProps
	| ButtonButtonProps
	| ButtonSubmitProps
	| ButtonResetProps

export type SharedBaseButtonProps = {
	className?: string
	children?: React.ReactNode
} & Pick<
	HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
	'id' | 'tabIndex'
>

export type ButtonBaseProps = SharedBaseButtonProps & DistinctBaseButtonProps

export const ButtonBase: FunctionComponent<ButtonBaseProps> = ({
	children,
	className,
	id,
	tabIndex,
	...otherProps
}) => {
	const commonProps = { className, id, tabIndex }

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
				<a onClick={otherProps.onClick} {...commonProps}>
					{children}
				</a>
			</Link>
		)
	} else {
		assertNever(otherProps)
	}
	return null
}

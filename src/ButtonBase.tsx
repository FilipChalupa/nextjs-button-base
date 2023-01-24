import Link, { LinkProps as NextLinkProps } from 'next/link'
import React, {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	forwardRef,
	HTMLAttributes,
	Ref,
} from 'react'
import { assertNever } from './utils/assertNever'

// @TODO: find more general approach for common props like onClick onMouseDown …

type ButtonLinkProps = {
	type: 'link'
} & NextLinkProps &
	Pick<
		DetailedHTMLProps<
			AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
		'target' | 'rel'
	>

type ButtonButtonProps = {
	type: 'button'
} & Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'disabled'
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
	'id' | 'tabIndex' | 'onClick' | 'onPointerDown' | 'style' | 'title'
>

export type ButtonBaseProps = SharedBaseButtonProps & DistinctBaseButtonProps

export const ButtonBase = forwardRef<
	HTMLButtonElement | HTMLAnchorElement /* @TODO: respect type prop */,
	ButtonBaseProps
>(
	(
		{
			children,
			className,
			id,
			tabIndex,
			onClick,
			onPointerDown,
			style,
			title,
			...otherProps
		},
		ref,
	) => {
		const commonProps = {
			className,
			id,
			tabIndex,
			onClick,
			onPointerDown,
			style,
			title,
		}

		if (
			otherProps.type === 'button' ||
			otherProps.type === 'submit' ||
			otherProps.type === 'reset'
		) {
			return (
				<button
					{...commonProps}
					type={otherProps.type}
					disabled={otherProps.disabled}
					ref={ref as Ref<HTMLButtonElement>}
				>
					{children}
				</button>
			)
		} else if (otherProps.type === 'link') {
			const anchorProps = {
				...commonProps,
				target: otherProps.target,
				rel: otherProps.rel,
				ref: ref as Ref<HTMLAnchorElement>,
			}
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
					legacyBehavior // @TODO: remove this and nested <a>
				>
					<a {...anchorProps}>{children}</a>
				</Link>
			)
		} else {
			assertNever(otherProps)
		}
		return null
	},
)

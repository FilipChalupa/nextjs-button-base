import React, { FunctionComponent } from 'react'
import { ExampleButton } from './ExampleButton'
import './global.css'

export const Example: FunctionComponent = () => {
	return (
		<>
			<h1>Button example</h1>
			<h2>
				Link <code>{'<a href="https://example.com">'}</code>
			</h2>
			<ExampleButton type="link" href="https://example.com">
				Link
			</ExampleButton>
			<h2>
				Button <code>{'<button type="button">'}</code>
			</h2>
			<ExampleButton
				type="button"
				onClick={() => {
					alert('Click')
				}}
			>
				Button
			</ExampleButton>
			<h2>
				Button <code>{'<button type="submit">'}</code> and{' '}
				<code>{'<button type="reset">'}</code>
			</h2>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					alert('Submit')
				}}
			>
				<label>
					Dummy input: <input />
				</label>
				<br />
				<br />
				<div>
					<ExampleButton type="submit" variant="primary" size="small">
						Submit
					</ExampleButton>{' '}
					<ExampleButton type="reset" variant="secondary" size="small">
						Reset
					</ExampleButton>
				</div>
			</form>
		</>
	)
}

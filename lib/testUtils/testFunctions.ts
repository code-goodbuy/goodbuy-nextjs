import { screen, fireEvent, act, Matcher } from "@testing-library/react";

export function expectCallWithoutRejection(toCall: () => void, reject: any) {
	expect(toCall).toHaveBeenCalled();
	expect(reject).not.toHaveBeenCalled();
}

export async function typeInField(selector: string, newValue: string) {
	// given
	const field = screen.getByPlaceholderText(selector);
	// when
	await act(async () => {
		fireEvent.change(field, { target: { value: newValue } });
	});
}

export async function expectFieldError(selector: string, newValue: string) {
	//given + when
	await typeInField(selector, newValue);
	// then
	expect(screen.getByText("Invalid " + selector)).toBeVisible();
}

export function expectAllToBeVisible(elements: string[], selector: (text: Matcher) => HTMLElement) {
	for (let e of elements) {
		expect(selector(e)).toBeVisible();
	}
}

export function clickAll(elements: string[], selector: (text: Matcher) => HTMLElement) {
	for (let e of elements) {
		fireEvent.click(selector(e));
	}
}

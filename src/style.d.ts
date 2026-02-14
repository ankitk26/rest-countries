import {} from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme extends Theme {
		background: string;
		text: string;
		elements: string;
		input: string;
	}
}

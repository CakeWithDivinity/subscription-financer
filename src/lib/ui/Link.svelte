<script lang="ts">
	export let type: 'button' | 'text' = 'button';
	export let href: string;
	export let slim = false;
</script>

<a {href} class:button={type === 'button'} class:text={type === 'text'} class:slim>
	<slot />
</a>

<style lang="scss">
	a {
		border: 2px solid transparent;
		color: var(--text);
		display: block;
		text-decoration: none;

		&.button {
			background-color: var(--primary);
			font-size: 1.25rem;
			font-weight: bold;
			padding: 0.75rem 4ch;
			border-radius: 10px;
			box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			-webkit-tap-highlight-color: transparent;
			transition: all 125ms ease;
			text-align: center;

			&.slim {
				padding: 1ch 0.5rem;
				font-size: 1rem;
			}

			&:active {
				background-color: var(--background);
				border: 2px solid var(--primary);
			}
		}

		&.text {
			background-color: transparent;
			margin-top: 1rem;
			font-size: 0.8rem;
			border-bottom: 1px solid transparent;
			position: relative;
			text-align: center;

			&::after {
				content: ' ';
				position: absolute;
				height: 1px;
				width: 100%;
				left: 0;
				top: 100%;
				background-color: var(--text);
				transition: transform 125ms ease-out;
				transform-origin: center;
				transform: scaleX(0);
			}

			&:focus::after {
				transform: scaleX(1);
			}
		}
	}
</style>

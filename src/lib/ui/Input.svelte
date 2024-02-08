<script lang="ts">
	export let type: HTMLInputElement['type'] = 'text';
	export let name: string;
	export let required = false;
	export let placeholder: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let value: unknown = null;
	export let info: string | undefined = undefined;
	export let prefix: string | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type.match(/^(number|range)$/) ? +target.value : target.value;
	};
</script>

<div class="field">
	<label for={name}><slot /></label>
	<div class="input-wrapper">
		{#if prefix}<p class="prefix">{prefix}</p>{/if}
		<input
			id={name}
			{name}
			{type}
			{value}
			{required}
			{placeholder}
			{min}
			{max}
			{step}
			title={info}
			class:with-prefix={!!prefix}
			on:input={handleInput}
		/>
	</div>
	{#if info}<p class="info">{info}</p> {/if}
	{#if !!error}<p class="error">{error}</p>{/if}
</div>

<style lang="scss">
	.field {
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.input-wrapper {
		position: relative;
	}

	.prefix {
		position: absolute;
		font-size: 1.25rem;
		font-weight: bold;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
	}

	input {
		background-color: var(--background);
		border: 1px solid var(--text);
		color: var(--text);
		padding: 0.5rem;
		border-radius: 5px;
		font-size: 1rem;
		width: 100%;

		&.with-prefix {
			padding-left: 2rem;
		}
	}

	.error {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}

	.info {
		font-size: 0.75rem;
		margin-top: 0.25rem;
		color: var(--text);
		opacity: 0.6;
	}
</style>

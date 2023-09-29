<script lang="ts">
	export let type: HTMLInputElement['type'] = 'text';
	export let name: string;
	export let required = false;
	export let placeholder: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let value: unknown = null;

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type.match(/^(number|range)$/) ? +target.value : target.value;
	};
</script>

<div class="field">
	<label for={name}><slot /></label>
	<input id={name} {name} {type} {value} {required} {placeholder} on:input={handleInput} />
	{#if !!error}<p class="error">{error}</p>{/if}
</div>

<style lang="scss">
	.field {
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: bold;
	}

	input {
		background-color: var(--background);
		border: 1px solid var(--text);
		color: var(--text);
		padding: 0.5rem;
		border-radius: 5px;
		font-size: 1rem;
	}

	.error {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>

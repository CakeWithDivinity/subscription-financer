<script lang="ts">
	export let type: HTMLInputElement['type'] = 'text';
	export let name: string;
	export let required = false;
	export let placeholder: string | undefined = undefined;
</script>

<div class="field">
	<label for={name}><slot /></label>
	<input id={name} {name} {type} {required} {placeholder} />
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
</style>

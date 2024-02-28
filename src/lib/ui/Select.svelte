<script lang="ts">
	export let name: string;
	export let options: { name: string; value: string | number }[];
	export let value: string | number | null | undefined;
</script>

<div class="select-wrapper">
	<label for={name}><slot /></label>
	<select id={name} {name} bind:value>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.select-wrapper {
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	select {
		background-color: var(--background);
		border: 1px solid var(--text);
		border-radius: 0.25rem;
		padding: 0.5rem;
		color: var(--text);
		font-size: 1rem;
	}
</style>

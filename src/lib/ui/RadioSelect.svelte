<script lang="ts">
	export let options: { name: string; value: string }[];
	export let name: string;

	export let value: string | undefined = undefined;
</script>

<fieldset>
	<legend><slot /></legend>

	<div class="options">
		{#each options as option}
			<div class="option" class:selected={value === option.value}>
				<input
					type="radio"
					id={option.value}
					{name}
					value={option.value}
					checked={value === option.value}
					on:change={() => (value = option.value)}
				/>
				<label for={option.value}>{option.name}</label>
			</div>
		{/each}
	</div>
</fieldset>

<style lang="scss">
	fieldset {
		border: none;
	}

	legend {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.options {
		display: flex;
	}

	.option {
		flex-grow: 1;
		text-align: center;
		border-block: 1px solid var(--text);

		&.selected {
			background-color: var(--text);
			color: var(--background);
		}

		& + .option,
		&:first-child {
			border-left: 1px solid var(--text);
		}

		&:first-child {
			border-top-left-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
		}

		&:last-child {
			border-top-right-radius: 0.25rem;
			border-bottom-right-radius: 0.25rem;
			border-right: 1px solid var(--text);
		}
	}

	label {
		padding: 0.5rem;
		display: block;
		cursor: pointer;
		user-select: none;
	}

	input {
		// radios are controlled via labels
		display: none;
	}
</style>

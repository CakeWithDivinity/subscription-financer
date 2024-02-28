<script lang="ts">
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import RadioSelect from '$lib/ui/RadioSelect.svelte';
	import Select from '$lib/ui/Select.svelte';
	import type { Expense } from '@prisma/client';

	export let formData: Expense | undefined = undefined;
	export let action = '';

	const intervalOptions = [
		{ name: $_('create.intervals.monthly'), value: 'monthly' },
		{ name: $_('create.intervals.quaterly'), value: 'quaterly' },
		{ name: $_('create.intervals.yearly'), value: 'yearly' },
		{ name: $_('create.intervals.custom'), value: 'custom' }
	] as const satisfies { name: string; value: string }[];

	let intervalValue: (typeof intervalOptions)[number]['value'] | undefined =
		formData?.interval ?? intervalOptions[0].value;

	const monthOptions = [
		{ name: $_('create.months.january'), value: 1 },
		{ name: $_('create.months.february'), value: 2 },
		{ name: $_('create.months.march'), value: 3 },
		{ name: $_('create.months.april'), value: 4 },
		{ name: $_('create.months.may'), value: 5 },
		{ name: $_('create.months.june'), value: 6 },
		{ name: $_('create.months.july'), value: 7 },
		{ name: $_('create.months.august'), value: 8 },
		{ name: $_('create.months.september'), value: 9 },
		{ name: $_('create.months.october'), value: 10 },
		{ name: $_('create.months.november'), value: 11 },
		{ name: $_('create.months.december'), value: 12 }
	] satisfies { name: string; value: number }[];

	let isEdit = !!formData;
	let translationKey = isEdit ? 'edit' : 'create';
</script>

<form method="POST" use:enhance {action}>
	<h1>{$_(`${translationKey}.title`)}</h1>

	<Input
		name="name"
		placeholder="Spotify premium"
		info={$_('create.nameInfo')}
		required
		value={formData?.name}
	>
		{$_('create.name')}
	</Input>

	<RadioSelect name="interval" options={intervalOptions} bind:value={intervalValue}>
		{$_('create.interval')}
	</RadioSelect>

	{#if intervalValue === 'custom'}
		<div>
			<p class="custom-label">{$_('create.custom.label')}</p>
			<div class="custom-interval">
				<p>{$_('create.custom.every')}</p>
				<Input
					name="customMonths"
					type="number"
					required
					placeholder="3"
					min={1}
					value={formData?.customMonths}
				/>
				<p>{$_('create.custom.months')}</p>
			</div>
		</div>
	{/if}

	<Select name="monthOfPayment" options={monthOptions} value={formData?.monthOfPayment}>
		{$_('create.monthOfPayment')}
	</Select>

	<Input
		type="number"
		name="amount"
		prefix="€"
		step={0.01}
		required
		info={$_('create.amountInfo')}
		value={formData?.amount}
	>
		{$_('create.amount')}
	</Input>

	<div class="action">
		<Button type="submit">{$_(`${translationKey}.action`)}</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		flex-grow: 1;
	}

	h1 {
		text-align: center;
	}

	.action {
		margin-top: auto;
	}

	.custom-label {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.custom-interval {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: min-content;
		min-width: 12rem;
	}
</style>

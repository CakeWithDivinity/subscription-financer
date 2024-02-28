<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import RadioSelect from '$lib/ui/RadioSelect.svelte';
	import Select from '$lib/ui/Select.svelte';
	import { _ } from 'svelte-i18n';

	const intervalOptions = [
		{ name: $_('create.intervals.monthly'), value: 'monthly' },
		{ name: $_('create.intervals.quaterly'), value: 'quaterly' },
		{ name: $_('create.intervals.yearly'), value: 'yearly' },
		{ name: $_('create.intervals.custom'), value: 'custom' }
	] as const satisfies { name: string; value: string }[];

	let intervalValue: (typeof intervalOptions)[number]['value'] | undefined = undefined;

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
    
    //variable zur überprüfung ob es edit ist,
    //wenn ja nimm für das form edit.irgendwas und zeige modalbutton (den delete button)
    //wenn nein lass es wie es ist

</script>

<form method="POST" action="?/updateExpense" use:enhance>
	<h1>{$_('edit.title')}</h1>
	
	<Input
	name="name" value={data.expenses.name} placeholder="Spotify premium" info={$_('create.nameInfo')} required>
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
				<Input value={data.expenses?.customMonths} name="customMonths" type="number" required placeholder="3" min={1} />
				<p>{$_('create.custom.months')}</p>
			</div>
		</div>
	{/if}

	<Select name="monthOfPayment" options={monthOptions}>
		{$_('create.monthOfPayment')}
	</Select>

	<Input value={data.expenses?.amount} type="number" name="amount" prefix="€" step={0.01} required info={$_('create.amountInfo')}>
		{$_('create.amount')}
	</Input>
	
	<div class="action">
		<Button type="submit">{$_('edit.actions.save')}</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-height: 100%;
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

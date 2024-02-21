<script lang="ts">
	import NoExpensesDisclaimer from '$lib/ui/NoExpensesDisclaimer.svelte';

	export let data;
</script>

{#if !data.expenses.length}
	<NoExpensesDisclaimer />
{:else}
	<pre><code>{JSON.stringify(data.expenses)}</code></pre>
{/if}

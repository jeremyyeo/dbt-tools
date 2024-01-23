<script>
  import { getFirstUniqueLogLine } from "./helpers";

  let text = `03:31:29  1 of 4 START sql table model public.bar ........................................ [RUN]
03:31:29  2 of 4 START sql table model public.baz ........................................ [RUN]
03:31:30  2 of 4 OK created sql table model public.baz ................................... [SELECT 1 in 0.18s]
03:31:30  3 of 4 START sql table model public.foo ........................................ [RUN]
03:31:30  3 of 4 OK created sql table model public.foo ................................... [SELECT 1 in 0.08s]
03:31:30  4 of 4 START sql table model public.qux ........................................ [RUN]
03:31:30  4 of 4 OK created sql table model public.qux ................................... [SELECT 1 in 0.08s]`;
  $: parsed = text.split("\n");
  $: output = getFirstUniqueLogLine(parsed);
</script>

<div class="container">
  <section class="hero">
    <div class="hero-body pb-0">
      <p class="title">dbt log tools</p>
      <p>
        Use this tool to find out which is the first dbt model that did not run
        to completion or errored. This usually happens if your dbt process
        terminated midway through the run resulting in an incomplete log. See
        example below.
      </p>
    </div>
  </section>

  <section class="section pb-0">
    <p class="subtitle">Console logs</p>
    <textarea
      class="is-family-monospace is-size-7 textarea"
      rows="10"
      bind:value={text}
    />
  </section>

  <section class="section">
    <p class="subtitle">Output</p>
    <pre>{output}</pre>
  </section>
</div>

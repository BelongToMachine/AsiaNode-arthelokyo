import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const teamComponent = await readFile(new URL('../src/components/widgets/Team.tsx', import.meta.url), 'utf8');

test('team members use a horizontal snap carousel below the tablet breakpoint', () => {
  assert.match(teamComponent, /'use client'/);
  assert.match(teamComponent, /overflow-x-auto/);
  assert.match(teamComponent, /snap-x/);
  assert.match(teamComponent, /snap-mandatory/);
  assert.match(teamComponent, /lg:grid/);
  assert.match(teamComponent, /shrink-0/);
  assert.match(teamComponent, /snap-center/);
  assert.match(teamComponent, /setInterval/);
  assert.match(teamComponent, /min-width: 1024px/);
  assert.match(teamComponent, /prefers-reduced-motion: reduce/);
});

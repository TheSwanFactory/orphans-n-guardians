export function add(a: number, b: number): number {
  return a + b;
}

Deno.test(function addTest() {
  if (add(2, 3) !== 5) {
    throw new Error("Test failed: 2 + 3 should equal 5");
  }
});

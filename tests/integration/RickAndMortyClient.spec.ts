import { test, expect } from "@playwright/test";
import { RickAndMortyClient } from "@/services/RickAndMortyClient";
import { Filters } from "@/types/Filters";
import { Status } from "@/types/Status";
import { Gender } from "@/types/Gender";

test.describe("RickAndMortyClient", () => {
  test("should return a singleton instance", async () => {
    const instance1 = RickAndMortyClient.getInstance();
    const instance2 = RickAndMortyClient.getInstance();
    expect(instance1).toBe(instance2); 
  });

  test("should make a successful API call with filters", async ({ request }) => {
    const client = RickAndMortyClient.getInstance();
    const filters: Filters = {
      name: "Rick",
      status: Status.Alive,
      gender: Gender.MALE,
      page: 1,
    };

    const data = await client.search(filters);
    expect(data).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0); 
    expect(data.results[0]).toHaveProperty("name"); 
  });

  test("should return standard error json when an API call fails", async ({ page }) => {
    const client = RickAndMortyClient.getInstance();

    // Mock global fetch to simulate a network error
    await page.route("**/api/character/**", async (route) => {
      await route.fulfill({ status: 500, body: "Internal Server Error" });
    });

    const filters: Filters = { name: "NonExistentCharacter" };
    const data = await client.search(filters);

    expect(data).toEqual({"error": "There is nothing here"}); 
  });

  test("should construct the correct API URL", async () => {
    const filters: Filters = {
      name: "Morty",
      status: Status.Unknown,
      gender: Gender.UNKNOWN,
    };

    const expectedUrl =
      "https://rickandmortyapi.com/api/character/?name=Morty&status=unknown&gender=unknown";

    const client = RickAndMortyClient.getInstance();
    const actualUrl = new URL(
      "https://rickandmortyapi.com/api/character/?" +
        new URLSearchParams(filters as Record<string, string>).toString()
    ).toString();

    expect(actualUrl).toBe(expectedUrl);
  });
});

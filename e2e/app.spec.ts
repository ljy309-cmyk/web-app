import { test, expect } from "@playwright/test";

test.describe("앱 기본 렌더링", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지 타이틀이 'Web App'이다", async ({ page }) => {
    await expect(page).toHaveTitle("Web App");
  });

  test("헤더가 렌더링된다", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Web App" })).toBeVisible();
    await expect(page.getByText("실시간 실험 대시보드")).toBeVisible();
  });

  test("차트 섹션이 렌더링된다", async ({ page }) => {
    await expect(page.getByText("온도-저항 그래프")).toBeVisible();
  });

  test("제어판이 렌더링된다", async ({ page }) => {
    await expect(page.getByText("실험 제어")).toBeVisible();
  });
});

test.describe("슬라이더 인터랙션", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("온도 슬라이더를 조작하면 값이 변경된다", async ({ page }) => {
    const slider = page.getByLabel("온도 (K)");
    await slider.fill("50");
    await expect(page.getByText("50 K")).toBeVisible();
  });

  test("자기장 슬라이더를 조작하면 값이 변경된다", async ({ page }) => {
    const slider = page.getByLabel("자기장 (T)");
    await slider.fill("10");
    await expect(page.getByText("10.0 T")).toBeVisible();
  });

  test("온도를 92K 미만으로 설정하면 초전도 상태 메시지가 표시된다", async ({
    page,
  }) => {
    const slider = page.getByLabel("온도 (K)");
    await slider.fill("50");
    await expect(
      page.getByText("초전도 상태: 저항이 0에 근접합니다.")
    ).toBeVisible();
  });

  test("온도를 92K 이상으로 설정하면 일반 상태 메시지가 표시된다", async ({
    page,
  }) => {
    const slider = page.getByLabel("온도 (K)");
    await slider.fill("200");
    await expect(
      page.getByText("일반 상태: 온도가 임계점 이상입니다.")
    ).toBeVisible();
  });
});

test.describe("시각적 회귀 테스트", () => {
  test("초기 상태 스크린샷", async ({ page }) => {
    await page.goto("/");
    // 차트 애니메이션 완료 대기
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("initial-state.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("초전도 상태 스크린샷", async ({ page }) => {
    await page.goto("/");
    const slider = page.getByLabel("온도 (K)");
    await slider.fill("50");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("superconducting-state.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("강한 자기장 상태 스크린샷", async ({ page }) => {
    await page.goto("/");
    const fieldSlider = page.getByLabel("자기장 (T)");
    await fieldSlider.fill("15");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("high-magnetic-field.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe("접근성 기본 검증", () => {
  test("모든 슬라이더에 라벨이 연결되어 있다", async ({ page }) => {
    await page.goto("/");
    const tempSlider = page.getByLabel("온도 (K)");
    const fieldSlider = page.getByLabel("자기장 (T)");
    await expect(tempSlider).toBeVisible();
    await expect(fieldSlider).toBeVisible();
  });

  test("제목 계층 구조가 올바르다 (h1 → h2 → h3)", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    const h2s = page.getByRole("heading", { level: 2 });
    const h3 = page.getByRole("heading", { level: 3 });
    await expect(h1).toHaveCount(1);
    await expect(h2s).toHaveCount(2); // 온도-저항 그래프, 실험 제어
    await expect(h3).toHaveCount(1); // 상태 정보
  });
});

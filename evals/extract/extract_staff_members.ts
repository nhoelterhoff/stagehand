import { z } from "zod";
import { initStagehand } from "../utils";
import { EvalFunction } from "../types/evals";

export const extract_staff_members: EvalFunction = async ({
  modelName,
  logger,
}) => {
  const { stagehand, initResponse } = await initStagehand({
    modelName,
    logger,
    domSettleTimeoutMs: 3000,
  });

  const { debugUrl, sessionUrl } = initResponse;

  await stagehand.page.goto("https://panamcs.org/about/staff/");

  const result = await stagehand.extract({
    instruction:
      "extract a list of staff members on this page, with their name and their job title",
    schema: z.object({
      staff_members: z.array(
        z.object({
          name: z.string(),
          job_title: z.string(),
        }),
      ),
    }),
  });

  const staff_members = result.staff_members;
  await stagehand.close();

  const expectedLength = 47;

  const expectedFirstItem = {
    name: "Louis Alvarez",
    job_title: "School Resource Officer",
  };

  const expectedLastItem = {
    name: "Jessica Zipin",
    job_title: "School Based Therapist",
  };

  if (staff_members.length !== expectedLength) {
    logger.error({
      message: "Incorrect number of items extracted",
      level: 0,
      auxiliary: {
        expected: {
          value: expectedLength.toString(),
          type: "integer",
        },
        actual: {
          value: staff_members.length.toString(),
          type: "integer",
        },
      },
    });



    return {
      _success: false,
      error: "Incorrect number of staff members extracted",
      logs: logger.getLogs(),
      debugUrl,
      sessionUrl,
    };
  }

  // Check for the presence of the expected items
  const firstItemExists = staff_members.some(
    (member) =>
      member.name === expectedFirstItem.name &&
      member.job_title === expectedFirstItem.job_title
  );

  if (!firstItemExists) {
    logger.error({
      message: "Expected first staff member not found in extracted data",
      level: 0,
      auxiliary: {
        expected: {
          value: JSON.stringify(expectedFirstItem),
          type: "object",
        },
        actual: {
          value: JSON.stringify(staff_members),
          type: "array",
        },
      },
    });

    await stagehand.close();

    return {
      _success: false,
      error: "Expected first staff member not found in extracted data",
      logs: logger.getLogs(),
      debugUrl,
      sessionUrl,
    };
  }

  const lastItemExists = staff_members.some(
    (member) =>
      member.name === expectedLastItem.name &&
      member.job_title === expectedLastItem.job_title
  );

  if (!lastItemExists) {
    logger.error({
      message: "Expected last staff member not found in extracted data",
      level: 0,
      auxiliary: {
        expected: {
          value: JSON.stringify(expectedLastItem),
          type: "object",
        },
        actual: {
          value: JSON.stringify(staff_members),
          type: "array",
        },
      },
    });

    await stagehand.close();

    return {
      _success: false,
      error: "Expected last staff member not found in extracted data",
      logs: logger.getLogs(),
      debugUrl,
      sessionUrl,
    };
  }

  await stagehand.close();

  return {
    _success: true,
    logs: logger.getLogs(),
    debugUrl,
    sessionUrl,
  };
};
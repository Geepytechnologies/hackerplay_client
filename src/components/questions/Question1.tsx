import React from "react";

type Props = {};

const Question1 = (props: Props) => {
  return (
    <div className="gap-4 flex flex-col">
      <h1 className="text-[1.2rem] text-gray-600 font-[600]">1. Two Sum</h1>
      <p>
        Given an array of integers nums and an integer target, return indices of
        the two numbers such that they add up to target.
      </p>
      <p>
        You may assume that each input would have exactly one solution, and you
        may not use the same element twice.
      </p>
      <p>You can return the answer in any order.</p>
      {/* Example */}
      <div>
        <p>Input: nums = [2,7,11,15], target = 9</p>
        <p>Output: [0,1]</p>
        <p>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
      </div>
      <div>
        <p>Input: nums = [3,2,4], target = 6</p>
        <p>Output: [1,2]</p>
        <p>Explanation: Because nums[1] + nums[2] == 6, we return [1, 2].</p>
      </div>
      {/* Constraints */}
      <div>
        <p>
          {"2 <= nums.length <= 10"}
          <sup>4</sup>
        </p>
        <p>
          -10<sup>9</sup>
          {" <= nums[i] <= 10"}
          <sup>9</sup>
        </p>
        <p>
          -10<sup>9</sup>
          {" <= target <= 10"}
          <sup>9</sup>
        </p>
        <p>Only one valid answer exists.</p>
      </div>
    </div>
  );
};

export default Question1;

import React from "react";

type Props = {};

const Question2 = (props: Props) => {
  return (
    <div className="gap-4 flex flex-col">
      <h1 className="text-[1.2rem] text-gray-600 font-[600]">
        2. Add Two Numbers
      </h1>
      <p>
        You are given two non-empty linked lists representing two non-negative
        integers. The digits are stored in reverse order, and each of their
        nodes contains a single digit. Add the two numbers and return the sum as
        a linked list.
      </p>
      <p>
        You may assume the two numbers do not contain any leading zero, except
        the number 0 itself.
      </p>
      {/* Example */}
      <div>
        <p>Input: l1 = [2,4,3], l2 = [5,6,4]</p>
        <p>Output: [7,0,8]</p>
        <p>Explanation: 342 + 465 = 807.</p>
      </div>
      {/* Constraints */}
      <div>
        <p>The number of nodes in each linked list is in the range [1, 100]</p>
        <p>{"0 <= Node.val <= 9"}</p>
        <p>
          It is guaranteed that the list represents a number that does not have
          leading zeros.
        </p>
      </div>
    </div>
  );
};

export default Question2;

import { useState } from "react";
// import Switch from "react-input-switch";
import Switch from "@mui/material/Switch";

export default function QueryList({ users }) {
  return (
    <div className="mt-5">
      <table className="table-auto" style={{ width: "100%" }}>
        <thead className="border h-10">
          <th className="text-sm w-20">S.N</th>
          <th className="text-sm w-36">Name</th>
          <th className="text-sm w-36">Contact</th>
          <th className="text-sm w-36">Message</th>
          <th className="text-sm w-36">Address</th>
          <th className="text-sm w-36">Email</th>
          <th className="text-sm w-36">Created At</th>
        </thead>
        <tbody>
          {users?.map((item, index) => {
            return (
              <tr className="border" key={index}>
                <td className="text-xs w-20 text-center h-16">{index + 1}</td>
                <td className="text-xs w-36 text-center h-16">{item?.name}</td>
                <td className="text-xs w-36 text-center h-16">
                  {item?.contact}
                </td>
                <td className="text-xs w-36 text-center h-16">
                  {item?.message}
                </td>
                <td className="text-xs w-36 text-center h-16">
                  {item?.address}
                </td>
                <td className="text-xs w-36 text-center h-16">{item?.email}</td>
                <td className="text-xs w-36 text-center h-16">
                  {item.createdAt}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

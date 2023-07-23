import { useState } from "react";
// import Switch from "react-input-switch";
import Switch from "@mui/material/Switch";

export default function UserList({ users, enabledisableUser }) {
  return (
    <div className="mt-5">
      <table className="table-auto" style={{ width: "100%" }}>
        <thead className="border h-10">
          <th className="text-sm w-20">S.N</th>
          <th className="text-sm w-36">Name</th>
          <th className="text-sm w-36">Contact</th>
          <th className="text-sm w-36">Email</th>
          <th className="text-sm w-36">Created At</th>
          <th className="text-sm w-36">Status</th>
          <th className="text-sm w-52">Actions</th>
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
                <td className="text-xs w-36 text-center h-16">{item?.email}</td>
                <td className="text-xs w-36 text-center h-16">
                  {item.createdAt}
                </td>
                <td className="text-xs w-36 text-center h-16">
                  {/* {item.is_active ?  : "Disabled"} */}
                  <i
                    className="fa fa-circle"
                    style={{ color: item.is_active ? "green" : "red" }}
                  />
                </td>
                <td className="text-xs w-52 text-center h-16">
                  <div className="">
                    <Switch
                      onChange={() => {
                        enabledisableUser(item._id, !item.is_active);
                      }}
                      checked={item.is_active}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

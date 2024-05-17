import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      if (Array.isArray(passwords)) {
        setPasswordArray(passwords);
      } else {
        setPasswordArray([]);
      }
      console.log(passwords);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
      setPasswordArray([]);
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showpassword = () => {
    if (ref.current.src.includes("/icons/hide.png")) {
      ref.current.src = "/icons/view.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icons/hide.png";
      passwordRef.current.type = "text";
    }
  };

  const deletePassword = async (id) => {
    console.log("delete id", id);
    const filteredPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(filteredPasswords);
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.dark("😒Deleted Password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const editPassword = async (id) => {
    console.log("id", id);
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm({
      site: passwordToEdit.site,
      username: passwordToEdit.username,
      password: passwordToEdit.password,
      id: id,
    });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill out all fields before saving!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newPassword];

    setPasswordArray(updatedPasswords);
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword),
    });

    setForm({ site: "", username: "", password: "" });

    toast.dark("😁 Password Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("😁Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div>
      </div>

      <div className="px-2 pt-3 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-800 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            placeholder="Enter the Website URL"
            className="rounded-full border border-green-400 w-full px-4 py-1"
            type="text"
            name="site"
            onChange={handleChange}
          />
          <div className="flex md:flex-row flex-col w-full justify-between gap-8">
            <input
              value={form.username}
              placeholder="Enter the Username"
              className="rounded-full border border-green-400 w-full p-4 py-1"
              type="text"
              name="username"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                placeholder="Enter the Password"
                className="rounded-full border border-green-400 w-full p-4 py-1"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <span
                className="absolute right-[3px] top-[6px] cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  src="/icons/view.png"
                  alt=""
                  width={23}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-fit gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        {passwordArray.length != 0 && (
          <h2 className="text-green-800 text-2xl font-bold py-5 text-center">
            Your Passwords
          </h2>
        )}
        {passwordArray.length == 0 && (
          <div className="text-center font-bold text-green-900">
            No Passwords to show
          </div>
        )}
        {passwordArray.length != 0 && (
          <table className="table-auto bg-green-800 w-full rounded-md overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 text-white">Site</th>
                <th className="py-2  text-white">Username</th>
                <th className="py-2 text-white">Password</th>
                <th className="py-2 text-white">Action</th>
              </tr>
            </thead>
            <tbody className="bg-green-100 ">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 text-center border-white hover:text-green-950">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border-white ">
                      <div className="flex items-center justify-center">
                        {item.username}
                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border-white">
                      <div className="flex items-center justify-center">
                        <input
                          type="password"
                          value={item.password}
                          readOnly
                          className="bg-transparent border-none text-center w-11"
                        />

                        <div
                          className="size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border-white">
                      <span
                        className="cursor-pointer mx-1 "
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ghhwiltn.json"
                          trigger="hover"
                          colors="primary:#000000,secondary:#08a88a"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;

import { useState } from "react";
import bankdki from "../assets/bankdki.png";
import gundar from "../assets/Gundar.png";
import jackard from "../assets/Jakcard.png";
import { PiContactlessPaymentLight } from "react-icons/pi";

const Member = () => {
  // State untuk menyimpan data member
  const [members, setMembers] = useState([
    {
      id: 1,
      nama: "Fajar",
      npm: "123456789",
      jurusan: "Teknik Informatika",
      strata: "S1",
      fakultas: "Fakultas Teknik",
    },
    // Tambahkan member lainnya jika perlu
  ]);

  // State untuk form
  const [form, setForm] = useState({
    id: null,
    nama: "",
    npm: "",
    jurusan: "",
    strata: "",
    fakultas: "",
    gambar: null,
  });

  // State untuk modal edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State untuk modal detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Handle input perubahan pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, gambar: URL.createObjectURL(file) });
    }
  };

  // Handle submit data (add atau edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update data
      setMembers(
        members.map((member) =>
          member.id === form.id ? { ...member, ...form } : member
        )
      );
      setIsEditing(false);
    } else {
      // Tambah data baru
      setMembers([...members, { ...form, id: Date.now() }]);
    }
    setForm({
      id: null,
      nama: "",
      npm: "",
      jurusan: "",
      strata: "",
      fakultas: "",
      gambar: null,
    });
    setIsModalOpen(false);
  };

  // Handle edit data
  const handleEdit = (id) => {
    const memberToEdit = members.find((member) => member.id === id);
    setForm(memberToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle delete data
  const handleDelete = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  // Handle open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setForm({
      id: null,
      nama: "",
      npm: "",
      jurusan: "",
      strata: "",
      fakultas: "",
    });
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle open detail modal
  const handleView = (id) => {
    const member = members.find((member) => member.id === id);
    setSelectedMember(member);
    setIsDetailModalOpen(true);
  };

  // Handle close detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // Handle print detail
  const handlePrint = () => {
    const printContent = document.getElementById("detail-print-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex flex-col min-h-screen p-6 mt-2 ">
      <h1 className="text-3xl font-bold text-center mb-6">Data Member</h1>
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 flex justify-center flex-col items-center">
        {/* Button Tambah Data */}
        <div className="w-[1200px] flex justify-end">
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 text-white px-6 py-2 mb-4 rounded shadow hover:bg-blue-700 transition"
          >
            Tambah Data
          </button>
        </div>

        {/* Table */}
        <div>
          <table className="w-[1200px] border-collapse items-center justify-center">
            <thead>
              <tr>
                <th className="border p-3 text-left">#</th>
                <th className="border p-3 text-left">Nama</th>
                <th className="border p-3 text-left">NPM</th>
                <th className="border p-3 text-left">Jurusan</th>
                <th className="border p-3 text-left">Fakultas</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{member.nama}</td>
                  <td className="border p-3">{member.npm}</td>
                  <td className="border p-3">{member.jurusan}</td>
                  <td className="border p-3">{member.fakultas}</td>
                  <td className="border p-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(member.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    {/* Tombol View */}
                    <button
                      onClick={() => handleView(member.id)}
                      className="text-green-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-900 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Member" : "Tambah Member"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    className="w-full border text-red-600 bg-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">NPM</label>
                  <input
                    type="text"
                    name="npm"
                    value={form.npm}
                    onChange={handleChange}
                    required
                    className="w-full border text-red-600 bg-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Jurusan</label>
                  <input
                    type="text"
                    name="jurusan"
                    value={form.jurusan}
                    onChange={handleChange}
                    required
                    className="w-full border text-red-600 bg-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Strata</label>
                  <input
                    type="text"
                    name="strata"
                    value={form.strata}
                    onChange={handleChange}
                    required
                    className="w-full border text-red-600 bg-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Fakultas</label>
                  <input
                    type="text"
                    name="fakultas"
                    value={form.fakultas}
                    onChange={handleChange}
                    required
                    className="w-full border text-red-600 bg-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                {/* Input gambar */}
                <div>
                  <label className="block font-medium mb-1">
                    Upload Gambar
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full border bg-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {form.gambar && (
                    <img
                      src={form.gambar}
                      alt="Preview"
                      className="mt-4 w-32 h-32 object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-600 text-red-500 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-950 font-semibold text-red-50 px-6 py-2 rounded"
                >
                  {isEditing ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Member Modal */}
      {isDetailModalOpen && selectedMember && (
        <div className="fixed  inset-0 bg-gray-500 bg-opacity-50 flex flex-col justify-center items-center">
          <div className="bg-gradient-to-b from-[#fde800] to-[#753995] p-6 rounded-3xl w-[540px] h-[400]  ">
            <div className="justify-between flex">
              <img src={bankdki} alt="" className="w-48 h-full" />
              <img src={gundar} alt="" className="w-20 h-20" />
            </div>
            <div className="flex justify-between  items-center gap-8">
              <div className="flex items-center gap-5">
                <div className="w-32 h-36">
                  {selectedMember.gambar && (
                    <div>
                      <img
                        src={selectedMember.gambar}
                        alt="Preview"
                        className="w-32 h-36"
                      />
                    </div>
                  )}
                </div>

                <div id="detail-print-content" className="font-semibold">
                  <p>{selectedMember.npm}</p>
                  <p>{selectedMember.nama}</p>
                  <p>
                    {selectedMember.strata} - {selectedMember.jurusan}
                  </p>
                  <p></p>
                  <p>{selectedMember.fakultas}</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 ">
                <p className="text-lg">prepaid</p>
                <PiContactlessPaymentLight className="w-8 h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-end justify-start w-[240px]  px-0 ">
                <div className="flex items-center mt-8 w-full text-[15px] tracking-[-1px] leading-[18px]">
                  <span>
                    <span>
                      <span>U</span>
                      <span className="text-[#f47820]">G</span>
                    </span>
                    <span> </span>
                    <span className="text-black">
                      <span className="text-[#592971]">CO</span>
                      <span className="text-[#ee2824]">LO</span>
                      <span className="text-[#fae303]">RING</span>
                      <span> THEGLOBAL FUTURE</span>
                    </span>
                  </span>
                </div>
                <div className="relative w-full h-[5px] flex items-center">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#fae303]"></div>
                  <div className="absolute top-0 left-0 w-[160px] h-full bg-[#ee2824]"></div>
                  <div className="absolute top-0 left-0 w-[80px] h-full bg-[#592971]"></div>
                </div>
              </div>

              <div className="w-24">
                <img src={jackard} alt="" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleCloseDetailModal}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;

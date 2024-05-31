import Table from "../../shared/Table";
import sendNotif from "../../../utils/sendNotif";
import NotifMessages from "../../../constants/NotifMessages";
import axios from "axios";
import { useState } from "react";
import { claimProject } from "../../../apis";
import PageStatus from "../../../constants/PageStatus";
import Spinner from "../../shared/Spinner";
import useUserStore from "../../../store/useUserStore";

const ProjectsTable = ({ info, requestable = true }) => {
  const { token } = useUserStore((state) => ({
    token: state?.token,
  }));

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);

  const { headers, data } = info;

  const handleModalAccept = async (id, students) => {
    const info = { id: id, students: students.map(({ text }) => text) };
    students.every((student) => student?.text != "")
      ? ""
      : sendNotif(
          NotifMessages?.Project?.Error?.EmptyOrWrongSUID?.text,
          NotifMessages?.Project?.Error?.EmptyOrWrongSUID?.type
        );

    setPageStatus(PageStatus.Loading);
    try {
      console.log({ student_ids: students.map(({ text }) => text) });
      const result = await axios.post(
        claimProject(id),
        {
          students_id: students.map(({ text }) => text),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setPageStatus(PageStatus.Fetched);
      sendNotif(
        NotifMessages?.Project?.Success?.text,
        NotifMessages?.Project?.Success?.type
      );

      setTimeout(() => location.reload(), 3000);
    } catch (e) {
      setPageStatus(PageStatus.Error);
    }
  };

  return (
    <>
      {pageStatus == PageStatus.Fetched && (
        <Spinner text="بارگیری مجدد اطلاعات..." size="75" color="#000" />
      )}
      {pageStatus == PageStatus.Loading && (
        <Spinner text="درحال ارسال..." size="75" color="#000" />
      )}
      {pageStatus == PageStatus.Error && (
        <p className="text-center">
          <span>خطایی رخ داد دوباره تلاش کنید.</span>
          <br />
          <span>
            ممکن است پروژه توسط شخص دیگری برداشته شده باشد یا شماره دانشجویی
            وارد شده اشتباه باشد
          </span>
          <br />
          <span
            onClick={() => location.reload()}
            className="underline cursor-pointer">
            بارگیری مجدد صفحه
          </span>
        </p>
      )}
      {pageStatus == PageStatus.Init && (
        <Table
          headers={headers}
          data={data}
          handleModalAccept={requestable && handleModalAccept}
        />
      )}
    </>
  );
};

export default ProjectsTable;

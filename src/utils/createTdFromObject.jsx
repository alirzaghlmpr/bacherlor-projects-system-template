import Modal from "../components/shared/Modal";
import ConfirmProjectModal from "../constants/ConfirmProjectModal";
export const createTdFromObject = (
  object,
  index,
  speceficKey,
  speceficValue,
  className = "whitespace-nowrap px-6 py-4"
) => {
  let datas = [<td className={className}>{index + 1}</td>];

  for (const key in object) {
    if (key !== "id") {
      if (key === speceficKey && object[key] === speceficValue)
        datas.push(
          <td className={className}>
            {object[key]} <br />{" "}
            <Modal
              buttonContent={"اخذ پروژه"}
              header={ConfirmProjectModal?.header}
              content={ConfirmProjectModal?.content}
            />
          </td>
        );
      else datas.push(<td className={className}>{object[key]}</td>);
    }
  }
  return datas;
};

export default createTdFromObject;

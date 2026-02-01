import Image from "next/image";
import role from '../../../../../public/role.svg'

export default function RolesPage(){

 return (
  <>
   <div className="flex items-center justify-around h-full w-full">
      <Image src={role} alt="Roles" className="w-full h-full object-contain" />
   </div>
  </>
);
}

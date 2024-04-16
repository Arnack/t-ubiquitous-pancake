import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  Foundation,
  Octicons,
  Zocial,
  SimpleLineIcons
} from "@expo/vector-icons";
import React from "react";

import {
  Icon,
  IconProps
} from "@ui-kitten/components";

const iconsPacks = {
  "feather": (props: any) => <Feather height={props.size} width={props.size} {...props} />,
  "ionicons": (props: any) => <Ionicons height={props.size} width={props.size} {...props} />,
  "font-awesome5": (props: any) => <FontAwesome5 height={props.size} width={props.size} {...props} />,
  "material-icons": (props: any) => <MaterialIcons height={props.size} width={props.size} {...props} />,
  "material-community-icons": (props: any) => <MaterialCommunityIcons height={props.size} width={props.size} {...props} />,
  "ant-design": (props: any) => <AntDesign height={props.size} width={props.size} {...props} />,
  "entypo": (props: any) => <Entypo height={props.size} width={props.size} {...props} />,
  "evil-icons": (props: any) => <EvilIcons height={props.size} width={props.size} {...props} />,
  "fontisto": (props: any) => <Fontisto height={props.size} width={props.size} {...props} />,
  "foundation": (props: any) => <Foundation height={props.size} width={props.size} {...props} />,
  "octicons": (props: any) => <Octicons height={props.size} width={props.size} {...props} />,
  "zocial": (props: any) => <Zocial height={props.size} width={props.size} {...props} />,
  "simple-line-icons": (props: any) => <SimpleLineIcons height={props.size} width={props.size} {...props} />,
};
interface CustomeIconProps extends IconProps {
  pack?: "feather" | "ionicons" | "font-awesome5" | "material-icons" | "material-community-icons" | "ant-design" | "entypo" | "evil-icons" | "fontisto" | "foundation" | "octicons" | "zocial" | "simple-line-icons" | "default"; 
}

const CustomeIcon = (props: CustomeIconProps) => {

  return props.pack && props.pack.length > 1 ? iconsPacks[props?.pack as keyof typeof iconsPacks](props) : (
    <Icon height={props.size} width={props.size} {...props} fill={props.color} />
  )
};
export default CustomeIcon;

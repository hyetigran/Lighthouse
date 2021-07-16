import React, { memo, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import ActionSheet from "react-native-actions-sheet";

const { height } = Dimensions.get("window");
export const MODAL_MAX_HEIGHT = height * 0.85;

interface ActionProps {
  fullScreen?: boolean;
  isVisible?: boolean;
  children: any;
  closeModal: () => void;
  modalHeight?: number;
  overflow?: string;
  contentStyles?: any;
  line?: boolean;
}

function ModalComponent({
  isVisible,
  closeModal,
  children,
  modalHeight = 400,
  overflow = "hidden",
  contentStyles = {},
  line = true,
  fullScreen = false,
  ...rest
}: ActionProps) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (isVisible) {
      ref.current?.setModalVisible(true);
    } else {
      ref.current?.setModalVisible(false);
    }
  }, [isVisible]);

  const calculateHeight = useMemo(() => {
    if (fullScreen) {
      return height;
    }
    if (modalHeight < MODAL_MAX_HEIGHT) {
      return modalHeight;
    }

    return MODAL_MAX_HEIGHT;
  }, [fullScreen, modalHeight]);

  return (
    <ActionSheet
      ref={ref}
      onClose={closeModal}
      //indicatorColor={line ? INACTIVE : "transparent"}
      containerStyle={styles.content}
      gestureEnabled
      closeOnPressBack
      //hideUnderlay
      {...rest}
    >
      <View
        style={[
          { height: calculateHeight },
          { overflow: overflow },
          contentStyles,
        ]}
      >
        {children}
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default memo(ModalComponent);

import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { useError } from "@/src/context/ErrorContext";
import { useLoading } from "@/src/context/LoadingContext";
import Screen from "../../components/Screen";
import { processApplianceScan } from "../../services/scanPipelineService";
import { colors } from "../../theme/colors";

export default function ScanApplianceScreen({ navigation, route }: any) {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<any>(null);
  const { showError } = useError();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    requestPermission();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();

    setPhotoUri(photo.uri);
  };

  const retakePhoto = () => {
    setPhotoUri(null);
  };

  const usePhoto = async () => {
    if (!photoUri) return;
    showLoading();
    try {
      const parsed = await processApplianceScan(photoUri);
      console.log("Scan Result: ", parsed);

      route.params?.onScanComplete(parsed);

      navigation.goBack();
    } catch {
      showError("Scan failed. Please try again.");
    }  finally {
      hideLoading();
    } 
  };

  if (!permission?.granted) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.permissionText}>Camera permission required</Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
            <Text style={styles.primaryText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const pickImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
    });

    if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.small}>SCAN LABEL</Text>
        <Text style={styles.title}>Scan Appliance Label</Text>

        {!photoUri ? (
          <>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
            />

            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
              </View>

              <Text style={styles.scanHint}>
                Align appliance label inside frame
              </Text>
            </View>
            {/* <AppCard style={styles.tipCard}>
              <Text style={styles.secondaryText}>
                Align appliance model label clearly inside frame
              </Text>
            </AppCard> */}
            <View style={styles.column}>
              <TouchableOpacity style={styles.primaryBtn} onPress={takePhoto}>
                <Text style={styles.primaryText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={pickImage}>
                  <Text style={styles.secondaryText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Image source={{ uri: photoUri }} style={styles.preview} />

            <View style={styles.row}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={retakePhoto}>
                <Text style={styles.secondaryText}>Retake</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryBtn} onPress={usePhoto}>
                <Text style={styles.primaryText}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.manualBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.manualText}>Enter Manually Instead</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionText: {
    color: colors.text,
    marginBottom: 20,
  },

  small: {
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 2,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  camera: {
    height: 320,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  preview: {
    height: 320,
    borderRadius: 20,
    marginBottom: 20,
  },

  tipCard: {
    backgroundColor: "#102818",
    marginBottom: 20,
  },

  tip: {
    color: colors.primary,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  column: {
    flexDirection: "column",
    gap: 10,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    height: 58,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryText: {
    fontWeight: "bold",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#172018",
    padding: 16,
    height: 58,
    borderRadius: 18,
    
    alignItems: "center",
  },

  secondaryText: {
    color: colors.secondaryText,
  },

  manualBtn: {
    alignItems: "center",
    marginTop: 12,
  },

  manualText: {
    color: colors.primary,
  },
  cameraWrapper: {
    flex: 1,
  },


  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  scanFrame: {
    width: 260,
    height: 160,
    position: "relative",
  },

  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.primary,
  },

  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
  },

  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.primary,
  },

  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
  },

  scanHint: {
    marginTop: 24,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
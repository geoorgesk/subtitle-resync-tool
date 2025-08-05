import pysrt
import os

def shift_subtitles(input_path, output_folder, output_filename, shift_seconds):
    try:
       
        os.makedirs(output_folder, exist_ok=True)

        output_path = os.path.join(output_folder, output_filename)

        
        subs = pysrt.open(input_path)
        subs.shift(seconds=shift_seconds)
        subs.save(output_path)
        

        print(f"\n✔ Shifted subtitles saved to: {output_path}")

    except Exception as e:
        print(f"❌ Error: {e}")


input_path = input("Enter full path to subtitle file (.srt): ").strip()
output_folder = input("Enter output folder path: ").strip()
output_filename = input("Enter  the output subtitle file name (e.g., shifted_subs.srt): ").strip()
shift_seconds = float(input("Enter shift in seconds (e.g., -2.5 for earlier, 3.0 for delay): "))

shift_subtitles(input_path, output_folder, output_filename, shift_seconds)

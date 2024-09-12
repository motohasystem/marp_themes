import re
import argparse
import shutil
from pathlib import Path


def list_images_in_markdown(file_path):
    """
    引数に与えられたmarkdownファイルの中で参照している画像をリストアップして返す関数
    """
    image_pattern = re.compile(r"\!\[.*?\]\((.*?)\)")
    movie_pattern = re.compile(r'<video\s+src="(.*?)"\s+.*?>')

    images = []
    movies = []

    with file_path.open("r", encoding="utf-8") as file:
        content = file.read()
        lines = content.split("\n")
        for line in lines:
            path = image_pattern.findall(line)
            # pathに#が含まれていれば#以降を削除する
            if len(path) > 0:
                path = path[0]
                if "#" in path:
                    path = path.split("#")[0]
                images.append(path)

            path = movie_pattern.findall(line)
            if len(path) > 0:
                movies.append(path[0])

    return images


def list_movies_in_markdown(file_path):
    """
    引数に与えられたmarkdownファイルの中で参照している画像をリストアップして返す関数
    """
    movie_pattern = re.compile(r'<video\s+src="(.*?)"\s+.*?>')

    movies = []

    with file_path.open("r", encoding="utf-8") as file:
        content = file.read()
        lines = content.split("\n")
        for line in lines:
            path = movie_pattern.findall(line)
            if len(path) > 0:
                movies.append(path[0])

    return movies


def copy_images_to_directory(image_paths, source_directory, destination_directory):
    """
    第一引数の配列に含まれる画像ファイルを、第二引数のパスにコピーする、同名ファイルがある場合は上書きする
    """
    destination_directory.mkdir(parents=True, exist_ok=True)

    for image_path in image_paths:
        image_path = source_directory / Path(image_path)
        # print(image_path)
        if image_path.is_file():
            shutil.copy(image_path, destination_directory)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Markdownファイルから画像パスをリストアップし、コピー先ディレクトリにコピーします。"
    )
    parser.add_argument("file_path", type=Path, help="Markdownファイルのパス")
    parser.add_argument(
        "copy_dist", type=Path, help="画像をコピーするディレクトリのパス"
    )
    parser.add_argument(
        "--movie_dist", type=Path, help="動画をコピーするディレクトリのパス", required=False
    )
    args = parser.parse_args()

    file_path = args.file_path
    # file_pathのディレクトリパス
    file_dir = file_path.parent

    copy_dist = args.copy_dist

    images = list_images_in_markdown(file_path)
    copy_images_to_directory(images, file_dir, copy_dist)

    # print(images)

    if args.movie_dist is not None:
        print("動画ファイルをコピーします")
        movie_dist = args.movie_dist
        movies = list_movies_in_markdown(file_path)
        copy_images_to_directory(movies, file_dir, movie_dist)
